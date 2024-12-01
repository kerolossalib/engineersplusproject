import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "https://deno.land/x/dotenv/load.ts";
import * as pdfjsLib from "https://esm.sh/pdfjs-dist@2.14.305";
import pdf from "npm:pdf-parse/lib/pdf-parse.js";
import {
  Document,
  Groq,
  HuggingFaceEmbedding,
  Settings,
  VectorStoreIndex,
} from "https://cdn.jsdelivr.net/npm/llamaindex@0.8.24/dist/cjs/index.min.js";

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "Xenova/all-mpnet-base-v2",
});

// Supabase initialization
const supabaseUrl = Deno.env.get("APP_SUPABASE_URL");
const supabaseKey = Deno.env.get("APP_SUPABASE_KEY");

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing!");
  Deno.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Groq API initialization
const groqClient = new Groq({
  apiKey: Deno.env.get("GROQ_API_KEY"),
});

// Serve function for API endpoint
serve(async (req) => {
  try {
    // Parse request JSON
    const { userid, documentName } = await req.json();
    if (!userid || !documentName) {
      return new Response("Missing userid or documentName", { status: 400 });
    }

    // Retrieve PDF file from Supabase storage
    const { data: file, error: downloadError } = await supabase.storage
      .from("cvs")
      .download(`${userid}/${documentName}`);

    if (downloadError || !file) {
      console.error(downloadError);
      return new Response("Error downloading file from bucket", {
        status: 500,
      });
    }

    // Extract text from PDF
    const fileContent = await file.text();
    const fileBuffer = await file.arrayBuffer();

    // Create a document and index it using Llama
    const document = new Document({ text: fileContent, id_: "cv" });
    const index = await VectorStoreIndex.fromDocuments([document]);
    const retriever = index.asRetriever();
    const queryEngine = index.asQueryEngine({ retriever });

    // Query for data extraction using Groq and Llama APIs
    const query = `{
      "first_name": cv->name->first,
      "last_name": cv->name->last,
      "birthdate": cv->birthdate,
    }`;

    const params: Groq.Chat.CompletionCreateParams = {
      messages: [
        {
          role: "system",
          content: "You are a professional PDF data extractor.",
        },
        {
          role: "user",
          content: `Analyze the CV text and return the following query result as JSON:\n${query}`,
        },
      ],
      model: "llama3-8b-8192",
    };

    const chatCompletion = await groqClient.chat.completions.create(params);

    // Validate and return the response
    if (!chatCompletion || !chatCompletion.choices) {
      throw new Error("Invalid response from Groq API.");
    }

    return new Response(
      JSON.stringify(chatCompletion.choices[0].message.content),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Groq from "npm:groq-sdk";

import {
  rulesInItaly,
  responseStructure,
  responseExample,
} from "./constants.ts";

const groq = new Groq({
  apiKey: "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",
});

// Supabase initialization
const supabaseUrl = "https://yvxceyfobkrgxchrrrxl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2eGNleWZvYmtyZ3hjaHJycnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjk5Mjc1MywiZXhwIjoyMDQ4NTY4NzUzfQ.FFukQ6tN7Hs4qefq7sfBHnsHhGRmniUcLM_-fx6Cf-4";
// const supabaseUrl = Deno.env.get("APP_SUPABASE_URL");
// const supabaseKey = Deno.env.get("APP_SUPABASE_KEY");

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing!");
  Deno.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req, res) => {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({
          error: "Missing parameter: userId",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch user data with related nationality, position, and company details
    const { data: user, error: userError } = await supabase
      .from("users")
      .select(
        `
        id,
        email,
        birthday,
        nationality (id, name),
        positions (
          id,
          title,
          companies (id, name)
        )
      `
      )
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user data:", userError);
      throw new Error("Failed to fetch user data from the database.");
    }

    console.log("user", user);

    const { id, birthday, nationality } = user;

    if (!birthday || !nationality) {
      throw new Error(
        "User data is incomplete: Missing birthday, nationality, or destination."
      );
    }

    // Define the prompt for the Llama 3.1 model
    const prompt = `
      Now it's your turn to create a roadmap with all the necessary steps! Remember to output in JSON format. Do not say anything else in the response. Just the JSON format.
      Given that the user birthday is ${birthday}, nationality is ${nationality}, 
      and wants to travel to , what are the necessary steps to obtain the visa? 
      Return a JSON list of objects. Each object should contain:
      - step_title: The title of the step
      - step_description: A description of the step
      - necessary_documents: A list of documents required to finalize the step
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional italian lawyer, your work is to list the steps that the Italian employer or the stranger living in another country, needs to do so the stranger can start working as soon as possible.",
        },
        {
          role: "system",
          content: rulesInItaly,
        },
        {
          role: "system",
          content: responseStructure,
        },
        {
          role: "system",
          content: responseExample,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    if (
      !chatCompletion.choices ||
      !Array.isArray(chatCompletion.choices) ||
      !chatCompletion.choices[0]
    ) {
      console.error("Unexpected response format:", chatCompletion);
      throw new Error("Invalid response from Groq API");
    }

    const message = JSON.parse(chatCompletion.choices[0].message?.content) || {
      error: "No content available",
    };
    console.log("Message content:", message);

    const { stepsList } = message;

    // Iterate over steps to insert them into the roadmap_steps table
    for (const step of stepsList) {

      // Insert a single step into the roadmap_steps table
      const { data: insertedStep, error: stepError } = await supabase
        .from("roadmap_steps")
        .insert({
          user_id: userId,
          step_title: step.step_title,
          step_description: step.step_description,
          esitmated_duration: step.duration,
          responsable: step.responsable,
        })
        .select("id")
        .single(); // Retrieve the ID of the inserted step

      if (stepError) {
        throw new Error(`Error inserting step: ${stepError.message}`);
      }

      const stepId = insertedStep.id;

      // Insert the necessary documents for the step into the roadmap_steps_documents table
      const documents = step.necessary_documents.map((doc) => ({
        step_id: stepId, // Foreign key to roadmap_steps
        name: doc.name,
        description: doc.description,
        responsable: doc.responsable,
      }));

      const { error: docsError } = await supabase
        .from("roadmap_steps_documents")
        .insert(documents);

      if (docsError) {
        throw new Error(
          `Error inserting documents for step ${stepId}: ${docsError.message}`
        );
      }
    }


    return new Response(JSON.stringify({ data: "insertedSteps" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/getSteps' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

from fastapi import FastAPI
from transformers import LlamaForCausalLM, LlamaTokenizer

app = FastAPI()

model = LlamaForCausalLM.from_pretrained("./models/fine-tuned")
tokenizer = LlamaTokenizer.from_pretrained("./models/fine-tuned")

@app.post("/generate")
def generate(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=50)
    return {"response": tokenizer.decode(outputs[0])}

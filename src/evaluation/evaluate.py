from transformers import LlamaForCausalLM, LlamaTokenizer

# Load model and tokenizer
model = LlamaForCausalLM.from_pretrained("./models/fine-tuned")
tokenizer = LlamaTokenizer.from_pretrained("meta/llama")

# Example evaluation
prompt = "Once upon a time,"
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_length=50)
print(tokenizer.decode(outputs[0]))

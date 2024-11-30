from datasets import load_dataset
from transformers import LlamaTokenizer

# Load your dataset
dataset = load_dataset("your_dataset_name")  # Replace with your dataset

# Initialize tokenizer
tokenizer = LlamaTokenizer.from_pretrained("meta/llama")

def preprocess(example):
    return tokenizer(
        example["text"],
        padding="max_length",
        truncation=True,
        max_length=512,
        return_tensors="pt",
    )

# Apply preprocessing
tokenized_dataset = dataset.map(preprocess)
tokenized_dataset.save_to_disk("./data/processed/tokenized_dataset")

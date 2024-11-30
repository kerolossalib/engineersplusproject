from transformers import Trainer, TrainingArguments, LlamaForCausalLM

# Load preprocessed data
from datasets import load_from_disk
tokenized_dataset = load_from_disk("./data/processed/tokenized_dataset")

# Load model
model = LlamaForCausalLM.from_pretrained("meta/llama")

# Define training arguments
training_args = TrainingArguments(
    output_dir="./models/fine-tuned",
    per_device_train_batch_size=4,
    num_train_epochs=3,
    logging_dir="./logs",
    save_steps=500,
    save_total_limit=2,
    learning_rate=5e-5,
    warmup_steps=500,
)

# Train the model
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
)

trainer.train()

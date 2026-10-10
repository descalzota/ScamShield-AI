import pandas as pd
import numpy as np

from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
)

from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
)

MODEL_NAME = "microsoft/Multilingual-MiniLM-L12-H384"
OUTPUT_DIR = "./trained-model"

train_df = pd.read_csv("datasets/train.csv")
val_df = pd.read_csv("datasets/validation.csv")

train_dataset = Dataset.from_pandas(
    train_df[["text", "label"]]
)

val_dataset = Dataset.from_pandas(
    val_df[["text", "label"]]
)

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        padding="max_length",
        max_length=256,
    )

train_dataset = train_dataset.map(
    tokenize,
    batched=True,
)

val_dataset = val_dataset.map(
    tokenize,
    batched=True,
)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=2,
    id2label={0: "LEGITIMATE", 1: "SCAM"},
    label2id={"LEGITIMATE": 0, "SCAM": 1},
)

def compute_metrics(prediction):
    predictions = np.argmax(
        prediction.predictions,
        axis=1,
    )

    precision, recall, f1, _ = (
        precision_recall_fscore_support(
            prediction.label_ids,
            predictions,
            average="binary",
            zero_division=0,
        )
    )

    return {
        "accuracy": accuracy_score(
            prediction.label_ids,
            predictions,
        ),
        "precision": precision,
        "recall": recall,
        "f1": f1,
    }

training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    eval_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    greater_is_better=True,
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    compute_metrics=compute_metrics,
)

trainer.train()

trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)
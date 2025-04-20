import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load data
df = pd.read_csv("nlp_17.csv")

# Clean and check columns
df = df.rename(columns=lambda x: x.strip())
df = df.dropna(subset=['Symptoms_text', 'Disease Name'])  # Drop rows with missing values

# Features and labels
X = df['Symptoms_text']
y = df['Disease Name']

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Model pipeline
model = make_pipeline(TfidfVectorizer(), MultinomialNB())

# Train
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n✅ NLP Model Accuracy: {accuracy * 100:.2f}%\n")

# Safe classification report
labels_in_test = np.unique(y_test)
print("🔍 Classification Report:\n")
print(classification_report(y_test, y_pred, labels=labels_in_test, target_names=label_encoder.classes_[labels_in_test]))

# Save model and encoder
joblib.dump(model, "nlp_model.joblib")
joblib.dump(label_encoder, "label_encoder.joblib")

# Save TF-IDF vectorizer separately
tfidf_vectorizer = model.named_steps['tfidfvectorizer']
joblib.dump(tfidf_vectorizer, "tfidf_vectorizer.joblib")

print("\n✅ Model, label encoder, and vectorizer saved successfully!")

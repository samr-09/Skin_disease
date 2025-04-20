import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import os

# Load the trained model
model = load_model("cnn_model.keras")

# Load class names (folders under All_img)
class_names = sorted(os.listdir("All_img"))

# Function to preprocess image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Cannot read image from path: {image_path}")
    img = cv2.resize(img, (224, 224))  # MobileNetV2 input size
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# Function to predict disease
def predict_image(image_path):
    img = preprocess_image(image_path)
    predictions = model.predict(img)[0]
    top_idx = np.argmax(predictions)
    confidence = float(predictions[top_idx])
    disease_name = class_names[top_idx]
    return disease_name, confidence

# 🧑 User input
test_path = input("🖼️ Enter image path: ").strip()

# Run prediction and show result
try:
    disease, score = predict_image(test_path)
    print("\n📌 Disease prediction:", disease)
    print(f"🎯Confidence score: {score * 100:.2f}%\n")
except Exception as e:
    print(f"❌ Error: {e}")

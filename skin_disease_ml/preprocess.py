import os
import numpy as np
import cv2
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tqdm import tqdm
import pickle

# Paths
data_dir = "All_img"
output_dir = "preprocessed_data"
os.makedirs(output_dir, exist_ok=True)

print("[INFO] Loading images...")
X = []
y = []
image_size = 224  # <-- Match with CNN input size

for disease_name in tqdm(os.listdir(data_dir)):
    disease_path = os.path.join(data_dir, disease_name)
    if not os.path.isdir(disease_path):
        continue
    for img_name in os.listdir(disease_path):
        img_path = os.path.join(disease_path, img_name)
        try:
            img = cv2.imread(img_path)
            img = cv2.resize(img, (image_size, image_size))
            X.append(img)
            y.append(disease_name)
        except Exception as e:
            print(f"[WARNING] Failed to process {img_path}: {e}")

X = np.array(X)
y = np.array(y)
print(f"[INFO] Total images loaded: {len(X)}")

# Encode labels
print("[INFO] Encoding labels...")
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Save label encoder for prediction later
with open(os.path.join(output_dir, 'label_encoder.pkl'), 'wb') as f:
    pickle.dump(le, f)
print("[INFO] Saved label encoder.")

# Split the data
print("[INFO] Splitting dataset (80% train, 20% test)...")
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

# Save the preprocessed data
np.save(os.path.join(output_dir, 'X_train.npy'), X_train)
np.save(os.path.join(output_dir, 'X_test.npy'), X_test)
np.save(os.path.join(output_dir, 'y_train.npy'), y_train)
np.save(os.path.join(output_dir, 'y_test.npy'), y_test)

print("[INFO] Done! Files saved to preprocessed_data/")

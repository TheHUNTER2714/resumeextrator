# Use official Python runtime as a parent image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies required by your app
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
 && rm -rf /var/lib/apt/lists/*

# Copy the backend folder contents into /app inside container
COPY backend/ .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (Flask default is 5000)
EXPOSE 5000

# Command to run your app
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]

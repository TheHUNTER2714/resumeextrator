# Use an official Python image
FROM python:3.11-slim

# Install system dependencies (for PDF/image processing)
RUN apt-get update && \
    apt-get install -y tesseract-ocr poppler-utils && \
    rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy your project files into the container
COPY . /app

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the port your app runs on
EXPOSE 5000

# Start your Flask app using Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]

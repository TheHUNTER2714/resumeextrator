FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y tesseract-ocr poppler-utils && \
    rm -rf /var/lib/apt/lists/*

# Set working directory to backend
WORKDIR /app

# Copy everything from the backend folder to the container
COPY backend/ /app/

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 5000

# Run the app using Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]

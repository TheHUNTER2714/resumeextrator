from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import docx2txt
import os
import io

app = Flask(__name__)
CORS(app)

SKILL_KEYWORDS = {
    "python", "c", "c programming", "c++", "java", "html", "css", "javascript",
    "react", "node.js", "express", "typescript", "flask", "django", "sql", "mongodb",
    "git", "docker", "kubernetes", "aws", "azure", "gcp", "machine learning",
    "data analysis", "ms-office", "ms office", "microsoft office", "adobe photoshop",
    "adobe illustrator", "microsoft powerapps", "english proficiency", "communication",
    "leadership", "problem solving", "teamwork", "video editing"
}

def extract_text_from_pdf(file_stream):
    try:
        file_stream.seek(0)
        reader = PyPDF2.PdfReader(file_stream)
        text = " ".join(page.extract_text() or "" for page in reader.pages)
        return text.strip()
    except Exception as e:
        print("PDF error:", str(e))
        return ""

def extract_text_from_docx(file_stream):
    try:
        file_stream.seek(0)
        with io.BytesIO(file_stream.read()) as f:
            return docx2txt.process(f).strip()
    except Exception as e:
        print("DOCX error:", str(e))
        return ""

@app.route('/upload', methods=['POST'])
def upload():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['resume']
    text = ""

    try:
        file_stream = file.stream
        file_stream.seek(0)
        if file.filename.endswith(".pdf"):
            text = extract_text_from_pdf(file_stream)
        elif file.filename.endswith(".docx"):
            text = extract_text_from_docx(file_stream)
        elif file.filename.endswith(".txt"):
            content = file.read()
            try:
                text = content.decode('utf-8')
            except:
                text = content.decode('latin-1', errors='ignore')
        else:
            return jsonify({'error': 'Unsupported format'}), 400

        text_lower = text.lower()
        skills = []
        for keyword in SKILL_KEYWORDS:
            normalized = keyword.lower().replace("-", " ")
            if all(k in text_lower for k in normalized.split()):
                skills.append(keyword)
        return jsonify({'skills': sorted(skills)})
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

@app.route('/')
def home():
    return 'Resume Skill Extractor API is running!'

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

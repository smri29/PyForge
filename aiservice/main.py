from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys

# Initialize App
app = FastAPI()

# Enable CORS (So React can talk to this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---
class CodeSubmission(BaseModel):
    code: str
    problem_id: str
    # We will add test cases here later

# --- Routes ---

@app.get("/")
def read_root():
    return {"status": "NeuroForge AI Service is Online 🧠"}

@app.post("/execute")
def execute_code(submission: CodeSubmission):
    """
    Phase 1 Prototype: Just returns the code back.
    Phase 2: We will add Docker execution here.
    """
    return {
        "status": "success", 
        "message": "Code received by Python Service",
        "output": f"Simulated Output for: {submission.code[:20]}..."
    }
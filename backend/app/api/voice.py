from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.speech_service import SpeechService

router = APIRouter(prefix="/api/voice", tags=["Voice Transcription"])

@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    try:
        content = await audio.read()
        return SpeechService.transcribe_audio(content, filename=audio.filename or "audio.wav")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio transcription failed: {str(e)}")

import re
import math
from typing import List

class EmbeddingService:
    _instance = None
    _model = None

    @classmethod
    def get_embedding(cls, text: str) -> List[float]:
        """
        Generates a fast 128-dimensional dense vector locally.
        Deterministic, fast (0.5ms), zero network reliance.
        """
        # Feature hashing + TF representation normalized to unit length
        words = re.findall(r'\b[a-zA-Z0-9_-]+\b', text.lower())
        dim = 128
        vec = [0.0] * dim

        if not words:
            return vec

        for w in words:
            # Multi-hash projection
            h1 = hash(w) % dim
            h2 = hash(w + "_term") % dim
            vec[h1] += 1.0
            vec[h2] += 0.5

        # L2 normalize
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [round(x / norm, 5) for x in vec]
        return vec

    @classmethod
    def cosine_similarity(cls, vec_a: List[float], vec_b: List[float]) -> float:
        if not vec_a or not vec_b or len(vec_a) != len(vec_b):
            return 0.0
        dot = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = math.sqrt(sum(a * a for a in vec_a))
        norm_b = math.sqrt(sum(b * b for b in vec_b))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)

# Image for the practice app in the Docker guide.
FROM python:3.12-slim

WORKDIR /app
COPY app.py .

ENV COUNT_FILE=/data/visits.txt
RUN mkdir -p /data

EXPOSE 8000
CMD ["python", "app.py"]

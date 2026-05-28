import requests
import subprocess
import time
import json
import sys

FIREBASE_URL = "https://ramadan-2385b-default-rtdb.firebaseio.com"

def get_stream_config():

    response = requests.get(f"{FIREBASE_URL}/stream_config.json")

    if response.status_code != 200:
        print("Failed to fetch config")
        sys.exit(1)

    return response.json()

def extract_live(url):

    command = [
        "yt-dlp",
        "-g",
        "-f",
        "best",
        url
    ]

    result = subprocess.check_output(command).decode().strip()

    return result

def extract_video(url):

    command = [
        "yt-dlp",
        "-g",
        "-f",
        "best[ext=mp4]",
        url
    ]

    result = subprocess.check_output(command).decode().strip()

    return result

def save_direct_url(direct_url):

    payload = {
        "direct_url": direct_url,
        "timestamp": int(time.time() * 1000),
        "status": "online"
    }

    response = requests.put(
        f"{FIREBASE_URL}/live_links.json",
        json=payload
    )

    print(response.text)

def main():

    config = get_stream_config()

    youtube_url = config.get("youtube_url")
    stream_type = config.get("type")

    if not youtube_url:
        print("No YouTube URL Configured")
        return

    print("Extracting Stream URL...")

    try:

        if stream_type == "live":
            direct_url = extract_live(youtube_url)
        else:
            direct_url = extract_video(youtube_url)

        save_direct_url(direct_url)

        print("Stream Updated Successfully")

    except Exception as e:

        print(str(e))

if __name__ == "__main__":
    main()

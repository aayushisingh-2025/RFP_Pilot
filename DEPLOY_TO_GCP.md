# Deploying to Google Cloud Platform

Since I cannot execute `gcloud` commands in this environment, please run the following commands in your local terminal to deploy the app to project `rfp-accelerator-agent`.

## Option 1: Deploy from Local Machine (Fastest)

1.  **Login to Google Cloud** (if not already logged in):
    ```powershell
    gcloud auth login
    gcloud config set project rfp-accelerator-agent
    ```

2.  **Enable Required Services** (One time setup):
    ```powershell
    gcloud services enable cloudbuild.googleapis.com run.googleapis.com
    ```

3.  **Deploy**:
    Run this command to build the container and deploy to Cloud Run:
    ```powershell
    gcloud builds submit --config gcp_setup/cloudbuild.yaml .
    ```

    *This will take 2-3 minutes. Once done, it will output a Service URL (e.g., https://rfp-pilot-app-uc.a.run.app).*

## Option 2: Continuous Deployment from GitHub

If you want the app to redeploy every time you push to GitHub:

1.  Go to the [Cloud Run Console](https://console.cloud.google.com/run?project=rfp-accelerator-agent).
2.  Click **Create Service**.
3.  Select **Continuously deploy new revisions from a source repository**.
4.  Click **Set up with Cloud Build**.
5.  Select your repository: `aayushisingh-2025/RFP_Pilot`.
6.  Click **Next** and **Save**.

This creates a trigger that monitors your main branch.

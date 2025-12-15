# GCP Project Setup for RFP Pilot

This directory contains configuration for deploying the RFP Pilot App to Google Cloud Platform.

## Prerequisites
1.  GCP Project created.
2.  Billing enabled.
3.  APIs enabled:
    -   Cloud Build API
    -   Cloud Run API
    -   Container Registry API or Artifact Registry API

## Deployment Steps
1.  **Initialize SDK**:
    ```bash
    gcloud init
    gcloud config set project [YOUR_PROJECT_ID]
    ```

2.  **Submit Build**:
    Run this command from the root directory:
    ```bash
    gcloud builds submit --config gcp_setup/cloudbuild.yaml .
    ```

3.  **Verify**:
    Go to Cloud Run console and check the URL of the deployed service.

## Backend Integration (Future)
-   **Vertex AI**: Enable Vertex AI API. Update `rfpService.js` to call Cloud Functions that wrap Vertex AI calls.
-   **SharePoint**: Use Microsoft Graph API. Store credentials in Secret Manager.

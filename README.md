# Cloud Function: account-confirmation-email 

This function is responsible to generate an email notification to the email associated with the firebase account. The email will contain instructions asking the user to confirm the account.

## Environment Variables

The cloud function is dependent on information for the sender email account. Therefore, we need to provide some variables to the function especially when deploying. Perform the following:

* Create a file called `.env.yaml` in the root directory with the following attributes

```yaml
---
email-account: <EMAIL_ADDRESS>
email-password: <PASSOWRD>
```

## Deploy

In order to deploy the function to GCP manually from your local machine use the following command:

`gcloud functions deploy account-confirmation --trigger-event providers/firebase.auth/eventTypes/user.create --trigger-resource sweng-581-capstone --runtime nodejs10 --env-vars-file .env.yaml --region us-east1 --entry-point accountConfirmation`
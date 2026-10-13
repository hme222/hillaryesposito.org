# Security Policy

## Reporting a Vulnerability

If you find a security issue on this portfolio site, email:

espositohillary@gmail.com

Please include:

- The affected URL
- A clear description of the issue
- Steps to reproduce it
- Any screenshots or request details that help confirm the problem

Please do not publicly disclose the issue before I have had a chance to review it.

## Site Scope

This is a portfolio hosted on Vercel. It is a static React site plus one
serverless endpoint, "Ask about the work", which answers from the published
portfolio content using the OpenAI API. It does not store visitor questions. It
does not handle payments, accounts, medical records, or private user
transactions.

Protected case studies are redacted portfolio content. Password gates on static
sites are not a substitute for true access control, so confidential NDA material
should not be committed or deployed to the public build.

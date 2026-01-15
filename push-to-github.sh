#!/bin/bash

# Push Lexxi AI Pro Color Formulation to GitHub
# Run this after creating the repository on GitHub

cd /Users/tim/lexxi-color-tryonapp

echo "🚀 Pushing Lexxi AI Pro Color Formulation to GitHub..."
echo ""

# Add remote
git remote add origin https://github.com/tjpoisal/lexxi-ai-pro-color-formulation.git

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Push complete!"
echo ""
echo "Repository URL:"
echo "https://github.com/tjpoisal/lexxi-ai-pro-color-formulation"

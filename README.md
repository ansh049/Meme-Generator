# Meme Generator

A React app for choosing a meme template, adding captions and emojis, arranging them on a canvas, and downloading the finished meme as a JPG.

## Features

- Browse meme templates provided by the Imgflip API.
- Add multiple text captions and edit them by double-clicking.
- Drag captions and emoji layers around the meme.
- Adjust each layer's size and rotation independently.
- Export the finished canvas as a high-quality JPG.

## Requirements

- Node.js and npm
- An internet connection to load meme templates from Imgflip

## Getting started

Install the dependencies and start the development server:

```bash
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the app in development mode. |
| `npm test` | Start the Create React App test runner. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm run eject` | Eject the Create React App configuration. This is irreversible. |

## How to use

1. Select a template from the home page.
2. On the edit page, choose **Add text** to create a caption or open **Add emoji** and choose an emoji.
3. Drag each layer to position it. Use its size and rotation sliders to adjust it.
4. Double-click a caption to edit its wording.
5. Choose **Download meme** to save the canvas as `meme.jpg`.

## Built with

- React and Create React App
- React Router
- React Bootstrap
- `react-draggable` for movable layers
- `html2canvas` for image export
- [Imgflip's public meme API](https://api.imgflip.com/get_memes) for templates

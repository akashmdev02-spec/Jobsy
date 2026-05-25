// Your existing routes and middleware...
// app.get('/jobs', ...)

// Keep your local listener block, but add the export line below it:
if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log('Server running locally'));
}

module.exports = app; // 👈 CRUCIAL: Vercel requires this export

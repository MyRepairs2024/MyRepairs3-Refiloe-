/*/ server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const { Storage } = require('@supabase/storage');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Supabase credentials
const supabaseUrl = 'https://hpavlbqbspludmrvjroo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXZsYnFic3BsdWRtcnZqcm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyNzcwODIsImV4cCI6MjAwNTg1MzA4Mn0.HZXbPikgoL0V7sYj7xNPj0FUupXd8hx1JdMrixvq7Xw';
const supabase = createClient(supabaseUrl, supabaseKey);
const storage = new Storage(supabase);

app.post('/api/upload', async (req, res) => {
  try {
    const { data, error } = await storage.from('files').upload(req.files.file.name, req.files.file.data);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'File upload failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/

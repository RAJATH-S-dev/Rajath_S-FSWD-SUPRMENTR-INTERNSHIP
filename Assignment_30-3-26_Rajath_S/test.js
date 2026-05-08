const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

async function runTest() {
  try {
    // 1. Connect to MongoDB (Make sure MongoDB is running locally!)
    // If using MongoDB Atlas, replace this URI with your cloud URI.
    await mongoose.connect('');
    console.log('✅ Connected to MongoDB');

    // Clear previous test data so we start fresh every time
    await User.deleteMany({});
    await Post.deleteMany({});

    // 2. Create a new User
    const user = await User.create({
      username: 'johndoe',
      email: 'john@example.com',
      passwordHash: 'hashed_password_123',
      role: 'author'
    });
    console.log(`👤 User created: ${user.username} (ID: ${user._id})`);

    // 3. Create a new Post linked to that User
    const post = await Post.create({
      title: 'My First Blog Post',
      slug: 'my-first-blog-post',
      content: 'This is the content of my very first post!',
      author: user._id, // Referencing the user we just created
      tags: ['mongodb', 'mongoose', 'nodejs']
    });
    console.log(`📝 Post created: "${post.title}"`);

    // 4. Test the Reference (Populate)
    // Let's fetch the post and tell Mongoose to pull in the author's details
    const fetchedPost = await Post.findOne({ slug: 'my-first-blog-post' })
                                  .populate('author', 'username email');
    
    console.log('\n🔍 Fetched Post with Author details populated:\n');
    console.log(JSON.stringify(fetchedPost, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // 5. Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

runTest();
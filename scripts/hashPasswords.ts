import db from '../src/lib/db';  // Adjust the path based on your db location
import bcrypt from 'bcrypt';

async function hashAllPasswords() {
  try {
    // Get all users
    const [users]: any = await db.query('SELECT id, username, password FROM user');

    console.log(`Found ${users.length} users to update`);

    // Update each user's password
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      await db.query(
        'UPDATE user SET password = ? WHERE id = ?',
        [hashedPassword, user.id]
      );

      console.log(`Updated password for user: ${user.username}`);
    }

    console.log('All passwords have been hashed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating passwords:', error);
    process.exit(1);
  }
}

// Run the function
hashAllPasswords(); 
const mongoose = require('mongoose');

const connectDB = async () => {
  const atlasURI = process.env.MONGO_ATLAS_URI;
  const localURI = process.env.MONGO_LOCAL_URI;

  let atlasError = null;

  // ── Try Atlas First ──────────────────────────────────────
  try {
    console.log('\n⏳ Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(atlasURI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅  MongoDB Atlas Connected!');
    console.log(`📡  Host     : ${conn.connection.host}`);
    console.log(`🗄️   Database : ${conn.connection.name}`);
    console.log('🌍  Status   : Cloud (Atlas) — Primary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return;
  } catch (err) {
    atlasError = err;
    console.warn('\n⚠️  Atlas Connection Failed!');
    console.warn(`   Reason : ${err.message}`);
    console.log('\n🔄 Trying Local MongoDB as fallback...\n');
  }

  // ── Fallback to Localhost ────────────────────────────────
  try {
    const conn = await mongoose.connect(localURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅  Local MongoDB Connected!');
    console.log(`📡  Host     : ${conn.connection.host}`);
    console.log(`🗄️   Database : ${conn.connection.name}`);
    console.log('💻  Status   : Localhost — Fallback');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (localErr) {
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌  Both Connections Failed!');
    console.error(`   Atlas Error : ${atlasError?.message}`);
    console.error(`   Local Error : ${localErr.message}`);
    console.error('\n💡 Fix Options:');
    console.error('   1. Check your Atlas URI in .env file');
    console.error('   2. Whitelist your IP in Atlas Network Access');
    console.error('   3. Start MongoDB locally: net start MongoDB');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
};

module.exports = connectDB;

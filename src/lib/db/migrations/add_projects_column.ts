import { sql } from "drizzle-orm";
import { db } from "..";

async function runMigration() {
  console.log("⏳ Running migration to add projects column...");

  try {
    // Check if projects column already exists
    const checkResult = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'pdf_invoices' AND column_name = 'projects';
    `);
    
    if (checkResult.rows.length === 0) {
      // Add the projects column
      await db.execute(sql`
        ALTER TABLE pdf_invoices 
        ADD COLUMN projects JSONB NOT NULL DEFAULT '[]'::jsonb;
      `);
      
      // Check if hours and rate_per_hour columns exist
      const hoursCheck = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'pdf_invoices' AND column_name = 'hours';
      `);
      
      if (hoursCheck.rows.length > 0) {
        // Copy data from hours and ratePerHour to projects
        await db.execute(sql`
          UPDATE pdf_invoices 
          SET projects = jsonb_build_array(
            jsonb_build_object(
              'description', 'Hours worked', 
              'hours', hours::numeric, 
              'ratePerHour', rate_per_hour::numeric
            )
          );
        `);
        
        // Drop the old columns
        await db.execute(sql`
          ALTER TABLE pdf_invoices 
          DROP COLUMN hours,
          DROP COLUMN rate_per_hour;
        `);
      }
    } else {
      console.log("projects column already exists, skipping addition");
    }
    
    // Check branch_address column
    const branchAddressCheck = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'pdf_invoices' AND column_name = 'branch_address';
    `);
    
    if (branchAddressCheck.rows.length === 0) {
      // Try to rename branch_name to branch_address if it exists
      const branchNameCheck = await db.execute(sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'pdf_invoices' AND column_name = 'branch_name';
      `);
      
      if (branchNameCheck.rows.length > 0) {
        // Check if there's another branch_name column
        const branchNameCount = await db.execute(sql`
          SELECT COUNT(*) as count
          FROM information_schema.columns 
          WHERE table_name = 'pdf_invoices' AND column_name LIKE 'branch_%';
        `);
        
        // Fix: Ensure count is properly parsed as a number
        let count = 0;
        if (branchNameCount.rows && branchNameCount.rows[0] && branchNameCount.rows[0].count) {
          count = typeof branchNameCount.rows[0].count === 'number' 
            ? branchNameCount.rows[0].count 
            : parseInt(branchNameCount.rows[0].count.toString(), 10);
        }
        
        if (count === 1) {
          // Only one branch_name column exists, rename it
          await db.execute(sql`
            ALTER TABLE pdf_invoices 
            RENAME COLUMN branch_name TO branch_address;
          `);
          
          // Add a new branch_name column
          await db.execute(sql`
            ALTER TABLE pdf_invoices 
            ADD COLUMN branch_name VARCHAR(191);
          `);
        } else {
          // Both columns might exist, just add branch_address if needed
          await db.execute(sql`
            ALTER TABLE pdf_invoices 
            ADD COLUMN branch_address VARCHAR(191);
          `);
        }
      } else {
        // No branch_name column, add branch_address
        await db.execute(sql`
          ALTER TABLE pdf_invoices 
          ADD COLUMN branch_address VARCHAR(191);
        `);
      }
    }
    
    // Check branch_name column
    const branchNameCheck = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'pdf_invoices' AND column_name = 'branch_name';
    `);
    
    if (branchNameCheck.rows.length === 0) {
      // Add branch_name column
      await db.execute(sql`
        ALTER TABLE pdf_invoices 
        ADD COLUMN branch_name VARCHAR(191);
      `);
    }

    console.log("✅ Migration completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

runMigration().then(() => process.exit(0)); 
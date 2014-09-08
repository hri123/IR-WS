package com.ibm.derby.metadata;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

// Prints the details - row count & row size for each of the tables in all the schemas for a database
public class TableInfo {

	private static Connection conn = null;
	private static String dbURL = "jdbc:derby:C:/H/OPM/WorkArea/Olympia/Dump/MemAnalysis140611/default_rep_db/default_rep_db;";

	public static void main(String[] args) {
		createConnection();

	}

	private static void createConnection() {
		try {
			Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
			// Get a connection
			conn = DriverManager.getConnection(dbURL);

			Statement stmt = conn.createStatement();
			ResultSet results = stmt.executeQuery("select s.schemaname, t.tablename from sys.systables t, sys.sysschemas s " +
							"where t.schemaid = s.schemaid and t.tabletype = 'T' order by s.schemaname, t.tablename");

			DatabaseMetaData metadata = conn.getMetaData();

			while (results.next()) {
				String schemaName = results.getString(1);
				String tableName = results.getString(2);
				
				ResultSet resultSet = metadata.getColumns(null, schemaName,
						tableName, null);
				long sizeOfRow= 0;
				while (resultSet.next()) {
//					String name = resultSet.getString("COLUMN_NAME");
//					String type = resultSet.getString("TYPE_NAME");
					sizeOfRow += resultSet.getInt("COLUMN_SIZE");

					// System.out.println("Column name: [" + name + "]; type: ["
					// + type + "]; size: [" + size + "]");
				}

				Statement countStmt = conn.createStatement();
				ResultSet countResult = countStmt
						.executeQuery("select count (*) from " + schemaName
								+ "." + tableName);
				
//				ResultSetMetaData countResultMetaData = countResult.getMetaData();
				
				while (countResult.next()) {
					System.out.println(schemaName + "." + tableName + " , "
							+ countResult.getInt(1) + " , " + sizeOfRow);
				}

			}

			results.close();
			stmt.close();
		} catch (Exception except) {
			except.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}

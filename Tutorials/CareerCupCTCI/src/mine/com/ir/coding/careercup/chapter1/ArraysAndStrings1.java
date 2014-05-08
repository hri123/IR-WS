package com.ir.coding.careercup.chapter1;

/* Implement an algorithm to determine if a string has all unique characters. 
 * What if you can not use additional data structures?
 */
public class ArraysAndStrings1 {
	
	private static char[] uniqueCharArr = {'a', 'd', 'e', 'c', 'b'};
	private static char[] non_uniqueCharArr = {'a', 'b', 'e', 'c', 'b'};

	public static void main(String[] args) {
		
		checkUnique(uniqueCharArr);
		checkUnique(non_uniqueCharArr);
	}

	private static void checkUnique(char[] uniqueCharArr) {
		
		long checker = 0;
		
		for (char c: uniqueCharArr) {
			
			int val = c - 'a';
			if ((checker & (1 << val)) > 0) {
				System.out.println("Not Unique char: " + c);
				break;
			} else {
				checker |= (1 << val);
			}
			
		}
	}

}

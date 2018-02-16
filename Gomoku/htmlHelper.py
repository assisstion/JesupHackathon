with open('html.txt', 'a') as the_file:
	count = 1
 	for x in range (0, 19):
		the_file.write("<tr>\n")
		for y in range (0, 19):
    		the_file.write("""<td><input id="gbtn""" + str(count) + """" type="image" src="img/box.png" width="32" height="30" onclick="gomokuClick(""" + str(x) + """, """ + str(y) + """, 'gbtn""" + str(count) + """')"></td>\n""")
			count+=1
		the_file.write("</tr>\n")

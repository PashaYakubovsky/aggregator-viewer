const sequence = [
	`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣄⣫⣴⣰⣶⣿⣶⣶⣧⡠⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢙⣻⣿⣿⣿⣿⣿⣿⣿⣷⣿⣳⡤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⢪⡽⢿⡿⣿⠿⣿⠛⡟⣛⠛⣿⣿⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢩⢶⣞⢧⡻⣴⢫⠴⣩⢒⠡⢚⠰⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡽⣎⣷⣯⣞⣶⢱⣮⡵⣌⠲⣹⣞⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡺⢵⡻⣞⢷⣯⢟⡤⢋⡟⢺⠱⣹⣳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢤⢇⢀⡿⣸⢿⣸⣟⡠⢇⡸⢃⠤⣃⠼⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠩⢾⣨⢗⡯⣏⡷⣍⡣⢍⢳⡉⢦⣉⡰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠰⢏⡾⣽⣿⢿⣿⣿⠧⡙⣄⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢪⡗⢧⣏⢯⡚⢥⢊⠕⡘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡮⣝⡷⣎⣧⡙⣤⢋⡜⡌⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡰⠎⢴⣩⡟⡽⢶⡝⣦⢣⡼⠃⠘⣷⣶⣦⣄⣀⣀⡤⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣯⡝⣤⢠⢊⡛⡙⣭⢳⣻⠖⠏⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣤⣆⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡀⢄⣴⣴⣿⣿⣿⣿⣿⣿⣿⣦⣟⣯⢽⣛⠲⣏⠣⠉⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⡽⣏⡞⣷⠾⠷⠿⠶⢮⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠽⠯⠽⣭⣽⣽⣫⣛⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠹⣛⠶⠶⠶⠷⣭⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠐⠨⣭⣟⣛⣟⣛⣻⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢄⠀⠀⠀⠀
⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠌⠱⠷⣮⣭⣯⣽⣭⣿⣿⣿⣿⣿⣿⡿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀
⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣽⣛⠷⡾⢶⡿⣾⣷⣿⣿⣿⣿⣿⢷⣚⢦⢧⡹⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣕⠀⠀⠀
⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣽⢻⡟⣿⢻⣿⣾⣿⣿⣿⣿⣿⡟⣼⠚⡎⢳⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⣟⣭⣻⣿⣿⣟⣯⣿⣻⣛⣿⣻⣟⡿⣾⣿⣿⣿⣿⣿⡳⣏⡟⣜⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀
⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣷⡞⡿⣵⡚⢿⣿⣿⣿⣿⣯⣿⣽⣯⣿⣟⣿⣻⣿⣿⣿⣿⣿⣿⣿⣾⡵⣫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢭
⠀⢬⣿⣿⣿⣿⣿⣿⣿⣿⣧⣟⡵⣳⢏⡟⣿⣿⣿⣿⡾⣷⢿⡾⣷⢿⣽⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣳⡽⣯⣿⣿⣿⣿⣿⣽⣿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢯⠀
⠀⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣯⢿⣯⣿⣭⣿⣽⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣿⠿⠃⠀
⠀⠀⠘⢻⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣷⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠉⠛⠛⢉⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣻⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣃⠀⠀⠀⠀⠀⠀⠀⠀⠀`,
	`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⣀⡀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠈⠀⠀⠀⠀⣠⣶⣶⣻⣿⣿⣿⣭⡀⠀⠀⠠⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣬⢿⡟⠙⠛⠛⠛⠛⢿⣿⡇⠀⠀⠀⠀⠀⠀⠈⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⣿⣿⢨⣯⣂⣁⢂⠄⠐⢸⣿⡿⡁⠀⠀⠀⠀⠀⠀⠀⡉⠓⠢⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⠉⡿⣛⣿⡇⠻⢿⣿⢾⡟⠀⠀⠀⡀⠀⠀⠀⠀⠀⠘⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢛⣿⣸⡷⢡⡿⢧⣧⠀⣀⣾⡷⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣽⡧⢳⣷⡶⢤⡄⣶⠟⠉⠀⠀⠀⠀⢣⡀⠀⠀⢠⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⢀⡴⠚⣧⡽⣧⣴⣀⡴⢺⣧⡀⠀⠀⠀⠀⣠⠴⠃⠀⠀⡼⠁⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠒⠤⣤⣞⣠⢼⢻⡲⣹⢉⡭⢑⡾⣻⣝⠦⠀⣀⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠠⠖⠚⢀⣴⣿⠀⢸⣿⠷⣯⣌⣴⠞⠁⣿⣿⣿⣷⣶⣤⣤⣀⡀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣷⣿⣿⣿⠀⢸⣯⢻⣿⠛⠁⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣷⣶⣾⣷⣻⢵⢤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀
⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣽⣽⣿⣳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡎⠀⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠅⢸⣿⣓⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡇⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣺⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠁⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⣻⣿⡿⣽⣿⣿⣿⣿⣭⣛⣛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣭⣿⣿⣿⣿⣿⣿⣿⣾⠭⣍⠚⡔⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣬⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣟⣛⡛⢦⠡⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠠⠀⠀
⠐⠀⠀⠀⠀⠀⠀⠀⠄⢙⣿⣿⣿⣿⡇⣶⣶⣿⣼⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⠿⠀⡐⠄⣀
⠀⠀⠀⠀⠀⠀⢀⠀⠜⡀⠿⣿⣿⣿⣿⣟⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠛⠻⠛⠛⠛⠋⠁⢀⠠⣘⠰⠀
⡐⢂⡀⠄⡀⠂⠄⠂⡔⠡⠀⢋⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠂⡡⠌⢢⠁⡄⢠⠌⡒⢄⠣⠀
⠈⢡⠰⠈⠀⠀⠂⡁⠆⢱⠀⠀⠋⢒⠬⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⠒⠌⡄⢃⡘⢄⢊⠰⢊⠔⡁
⣤⠧⢣⢤⣀⠀⢡⢈⡱⢸⡀⢀⣀⢎⠖⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠱⡈⠔⡂⠜⡠⠌⢢⢡⢊⡄`,
	`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡴⠶⠶⠶⠖⠲⠤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠄⣴⡚⢀⣼⠏⠀⠀⠀⠀⣀⣀⠀⢀⣀⣀⠀⣴⡿⢶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠀⠈⢀⢎⢞⣁⣿⡇⠀⠀⠀⠀⠀⣇⠈⠉⠉⠀⠉⠉⣿⡂⡄⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⢄⡀⠀⠁⣄⣢⣾⣿⣾⣿⣿⡇⠀⠀⠀⠀⢀⣼⠀⠀⢀⣀⣀⣀⣹⣷⣅⣜⣮⣳⢦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣼⣾⣿⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⡅⣰⣞⡉⢳⣤⡷⠀⠊⢭⠶⠶⠸⣿⣿⣿⣿⣿⣿⣾⣿⣟⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠈⣹⣦⠁⠀⠀⠀⠀⠀⣤⣠⣙⣿⣿⣿⣿⣿⣿⣿⣿⣿⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷⣭⣤⠀⠀⠀⠀⠀⠀⢤⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣝⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡇⠀⠀⠀⠀⣀⣀⣀⣀⡀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣾⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢻⢯⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠄⣲⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⠋⠁⠀⠈⣧⠳⡄⠀⠀⠀⠀⠀⡾⢯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠉⠁⠀⢸⡀⠀⠀⠀⢻⠀⠙⢦⡀⠀⠀⡼⠀⢸⣿⣓⣚⡺⡟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣻⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠘⣇⣀⣤⣿⠶⣾⡁⠀⣸⣿⣿⣿⡇⡇⢸⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣽⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣴⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠠⡖⠋⠉⠀⠀⠀⠀⠘⣟⠳⠿⣝⣶⣿⢿⠃⢿⣒⣒⣰⠃⠈⡆⠀⢸⣿⣿⣿⣿⣿⣿⣿⡿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣼⣿⣿⣿⣿⣿⣿⣿⠿⠀⠀⠀⠀⢰⡀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠘⣗⠒⠶⠶⠾⠽⡇⢠⡏⠈⡇⠀⠀⡇⠀⣀⣿⣿⣿⣿⣿⣿⣯⠾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣿⣿⣿⣿⣿⣿⠇⢸⠀⠀⠀⠀⠀⣧⠀⠀⢳⡀⠀⠀⠀⠀⠀⠀⢸⣉⡉⠒⠲⠶⡇⢸⡇⠀⡇⠀⠸⡃⢠⠏⣻⣿⣿⣿⣿⣿⣿⣮⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢿⣿⣿⣿⣿⣿⣿⠀⠈⣇⠀⠀⠀⠀⠈⡇⠀⠀⠳⡀⠀⠀⠀⠀⠀⠈⣧⠉⠽⠿⣺⡇⠈⢷⡤⠇⠀⢀⡿⠈⡇⠸⣿⣿⣿⣿⣿⣿⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⠀⠀⠘⣆⠀⠀⠀⠀⡟⠀⠀⠀⠙⠢⣄⠀⠀⠀⠀⠹⣟⣛⣓⣒⡇⠀⢸⡇⠀⣠⠟⠀⢸⠀⠀⣿⣿⣿⣿⣿⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠠⠻⣿⣿⣿⣿⣿⡇⠀⠀⠉⠉⠀⠀⠀⣸⠃⠀⠀⠀⠀⠀⠈⠙⢦⣄⡀⠀⣿⣿⣿⡿⣇⣀⢸⡇⣰⠋⠀⠀⢸⠀⠀⢻⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣨⣿⣮⣿⣿⡇⠀⠀⠀⢀⣀⣀⣀⣯⣀⣀⣀⡤⠤⠤⠤⠖⠛⠉⣿⠋⠁⠀⠸⠒⢶⠿⢿⣷⠇⠀⠀⠀⢸⠀⠀⠸⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⣻⣿⣿⡿⢁⡤⠖⠛⠉⣩⠽⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⣛⣋⡝⠀⣼⡇⠀⠀⠀⠀⢸⠀⠀⠀⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢻⣿⡷⠋⠀⠀⠀⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢀⣀⣀⣠⣼⠃⡼⢻⠇⠀⠀⠀⠀⡼⠀⣠⣾⣿⣿⣃⠀⠀⠀⠀⢀⣤⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⡤⣦⣄⡟⢯⡁⢸⡤⢿⡟⠀⢼⠀⠀⠀⠀⠀⡇⠀⠋⢸⠇⠀⠉⠛⠲⣤⡴⢫⣾⣠⣤⢤⣄⣀⡀⠀
⠀⠀⠀⠀⠀⠀⠈⢧⡀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡤⠤⠤⠤⠿⠶⠛⠛⠃⠀⢳⡀⡗⠲⡇⠀⣸⠀⠀⣤⣀⢀⡇⠀⠀⠀⠀⠀⠀⠀⢸⠁⠀⣿⠁⠀⠀⢠⣞⣯⠽⣿
⠀⠀⠀⠀⠀⠀⠀⠈⠛⠒⠒⣾⣿⣿⡏⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣽⣉⣳⠀⣿⠀⠀⠿⠾⢹⣧⣄⣀⡀⠀⠀⠀⠀⢸⣄⡀⠈⠀⠀⢀⣰⢿⣭⣝⣶
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠙⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠭⠽⡀⣿⠀⠀⠀⠀⢸⡟⠃⠉⠉⠓⠒⠢⠤⣄⡻⣍⠓⣲⠒⢮⣿⠑⢮⣿⠉
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣠⣀⣸⠂⠐⣷⢻⠀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁⠀⠈⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡛⠒⠒⠒⠒⠒⠒⠒⠉⠉⠉⠉⠉⠀⠀⠀⠈⢙⠛⠿⠿⠟⠒⠒⠚⠉⠉⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,
	`⣿⣿⠛⡇⠀⠀⠙⣿⣿⠃⣀⣶⣿⣿⣿⣿⣿⣿⣿⣾⣇⣼⣿⣿⣿⣿⡿⠯⣶⣄⡋⣧⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸
⣿⣿⡶⠇⠀⠀⣾⣿⣥⣄⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠿⣿⡤⣀⡿⣿⣧⣿⡄⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘
⣿⣿⣿⡇⢀⣾⣿⣿⣿⣷⣿⣿⣿⣿⣿⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣽⣿⣿⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⡟⠁⠀⢹⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⢹⡿⣧⣹⠧⠠⢾⢸⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⡤⠀⠀⠈⠛⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢨⡗⠹⣿⡇⠀⢸⢸⢽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⢿⣿⡇⢀⣤⣤⣶⣶⣶⣄⠀⣴⣶⣶⣶⣤⣤⣀⠀⢿⡄⢸⠃⠀⢸⢸⣸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀
⣿⣿⠛⠛⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠋⣠⣴⣶⠶⠄⠀⠀⠈⠙⠿⠶⠶⠦⣝⡇⢸⣷⡏⠀⠀⢸⠘⢈⠇⠀⠀⠀⠀⢀⣀⣀⣠⣤⠀⠘
⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠈⠇⠈⡿⣦⣤⣤⢼⣦⣼⣷⣶⣿⣿⣿⣿⣿⣿⣤⣄⡠⠀
⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠿⣇⠀⠀⠀⠀⠀⢀⣤⣤⣴⣛⣦⠀⠀⠀⠀⡀⠀⣧⠘⣿⣧⣤⣬⡿⠿⠻⠟⠛⣿⣟⣿⡉⠀⠀⠀⠀
⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣴⠇⠀⠀⠀⠀⠀⠉⠛⠛⠉⠉⠈⠂⠀⠀⠀⠸⢀⡼⣷⠉⠀⡜⠁⢹⣤⠖⢠⣾⣿⣿⣿⣟⣆⠀⠀⠀
⣿⣿⢈⣤⣤⣤⣶⣒⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣀⠀⠀⠀⠀⠀⣿⣤⡞⠀⠀⢸⡀⠸⠁⣠⣿⣿⡿⠋⠙⢿⣿⡷⠦⠤
⣿⡏⡞⠙⠛⠻⢯⣿⡇⠀⠀⣸⣿⣷⢧⡀⠀⠀⠸⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⣸⡟⠻⢿⣿⣶⡾⢷⣿⣾⣿⣿⠏⠀⠀⠀⠀⣿⣿⣦⠀
⣿⡇⡇⠀⣴⣿⣷⣿⡷⠀⢭⢹⣏⣋⣴⣇⠀⠀⠀⠀⠭⠭⠽⡃⠀⠀⠀⠀⠼⢿⢿⠂⢸⣿⣿⠇⢼⣿⣿⣿⣦⣤⢴⣄⣠⠄⠻⠛⠻⡄
⣿⢣⡇⠀⣩⣿⣿⣿⡇⠀⣍⢻⣿⣿⣿⣿⣆⠀⠀⠀⠙⠶⠟⠁⠀⠀⠀⠀⠀⠸⡈⣿⣟⡛⠛⣷⢺⣿⣿⠃⠀⠀⠠⠆⠀⠀⠀⠀⠀⠐
⣿⣼⡄⠈⣿⣿⣿⣿⠃⠠⣷⣾⣿⣿⣿⡿⢿⡆⠀⢄⣀⡀⠀⠀⠀⣠⠄⠀⠀⡸⠁⣿⣿⣿⣧⣼⠶⣿⡧⠀⠒⠒⠚⠁⠀⠀⠀⠀⠀⠀
⣿⣿⡇⣸⣿⣿⣷⣿⠀⠨⣻⣿⣿⣿⣇⣀⡤⢻⠀⠀⠉⠻⣿⠟⠋⠁⠀⠀⡴⠁⣸⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣤⣤⣀⣀⡀⠀⠀
⣿⣿⡇⠾⣿⣿⣉⡉⠀⠘⢺⣿⣿⣿⡇⡸⠁⣿⠀⠀⠀⠀⢰⣄⠀⠀⣠⠎⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡇⢾⣿⢻⣿⡿⠷⡖⠚⢻⣿⣿⣠⠇⠀⣿⡄⠀⠀⠀⠀⠩⣤⡞⠁⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡗⠀⢹⢻⢿⠲⠄⣧⠀⣿⣿⣿⣿⠀⠀⠙⢧⡀⠀⠀⣠⡾⠋⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
	`⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣟⣿⣿⣽⣿⣿⣿⢿⣻⣻⢏⣟⡻⠏⠙⠋⠉⠛⠛⠿⢛⠻⢿⣿⣿⣭⣛⣞⡱⢯⡹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣽
⣿⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣷⣿⣽⣛⣾⣿⣟⣿⣾⢿⡷⣶⣛⢾⣵⢾⣹⠎⠀⠀⠀⠀⠀⠀⠀⠉⠛⢟⡶⣬⣙⢻⣜⢲⣍⣳⡝⣎⡽⣫⣿⢿⡿⣽⣻⣿⣿⣿⣿⣿⣿⡗⣯
⣿⣿⣿⣿⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡽⣾⡏⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢾⣷⣾⣯⢞⡳⣎⡳⣾⣽⣾⣿⣾⣷⣿⣿⣿⣿⣿⣿⣿⣯⢷⣃⡿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣽⣯⣽⢾⡃⠀⢠⠀⠰⢩⢲⡙⢶⢲⠀⠀⡼⢟⠿⢖⡯⢳⡭⢳⣏⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣶⡻
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣿⣿⣿⡿⣿⣿⣿⣯⣷⣿⣾⣏⠀⠀⠐⠀⠀⠉⣆⠙⠊⠧⠁⠀⣍⡋⠿⡼⢿⢸⡱⡟⣎⠻⣖⢮⡿⠿⠿⣿⣿⣿⣿⣏⣟⣻⣿⢿⣻
⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣷⣟⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡿⠁⢨⠁⠒⠐⠀⡸⣄⣠⠤⠂⠈⣿⣿⣧⡙⠯⣞⣱⡇⣿⣷⡜⣧⢻⣛⡷⣌⠻⣿⣿⣷⡞⣧⢯⣿⢿
⣿⣿⣿⣻⣿⣿⣻⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣀⠀⡌⠡⠀⠤⠲⣥⠃⠀⣦⣾⢿⣿⡿⠂⣝⡲⡍⣿⠛⡼⣷⣾⣿⣏⡽⣻⡽⣿⢿⣿⡽⣿⣿⣿
⣿⣿⣿⣷⣿⣿⣿⣿⣿⡿⢿⣿⢿⣿⣿⣿⣿⣿⣿⣯⡻⢿⣿⣿⣿⣿⣿⡯⠍⢀⠐⠢⣄⠶⡰⠀⣠⣽⣿⣿⣿⣿⣿⡆⢣⣛⡽⠂⣾⣍⣷⣻⣿⡿⣟⣱⣯⣼⣛⡾⣿⣿⣿⣿
⡿⣿⣿⣿⣿⣿⣻⣟⣿⣿⣷⡽⣿⣿⣿⣿⢿⣿⣿⣿⡙⣦⠻⢿⣿⡿⢃⡴⠃⠀⠄⣀⢈⡁⡄⠀⠀⢻⣿⢿⣿⣏⠷⢦⡏⣼⢣⢿⣿⣿⣶⢻⢟⣾⣝⠾⣿⡳⣿⣿⣿⣿⣿⣿
⣿⣟⣯⣿⢿⡿⣿⢽⡿⣿⣿⣿⣽⣿⣿⣿⢼⣿⣷⣿⣿⡿⠟⣒⡤⠀⠉⣠⠀⠄⠈⠐⢦⠱⢊⡼⠀⠀⠉⠋⠡⠮⠻⢿⣖⠽⣚⢾⣿⣿⡿⣠⣿⣿⣿⣽⢳⣷⣿⣿⣿⣿⣿⣿
⣿⣾⣷⣿⣿⣻⣽⣾⣷⣻⣿⣿⣆⠻⣿⣿⣻⣟⣾⠛⢃⠶⠛⠃⠀⠀⢀⣿⠀⠐⠂⠈⢀⣴⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠚⢞⣿⣻⠃⣿⣿⣟⠏⣬⠯⣝⠯⣿⢟⣯⣷⣿
⣿⣿⣿⡿⣟⣯⣿⣿⡾⣷⣻⣿⢿⣷⡘⣿⣵⣺⠖⠊⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⠻⠿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢻⡴⢿⣿⠏⡴⣿⣾⡩⢿⣿⣿⣷⣿⣿
⣿⣿⣿⡿⣽⣞⠿⣯⣟⣳⡽⡏⣼⣿⣷⡆⢸⣧⠧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢾⣼⢣⣏⣰⢻⡿⢿⡽⣍⣿⣿⣿⣿⣿
⣻⣟⡿⣞⢯⣾⣿⣿⠇⣿⢼⣧⢹⣿⣿⡇⣻⡞⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣾⢷⣪⢵⣫⣞⣛⢽⣦⡻⣿⣿⣿⣿
⣿⡼⣳⣿⣿⣿⣿⡿⡜⣾⡷⢯⡆⢻⣿⡇⣷⣻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡾⣵⡎⠇⢿⣿⣷⣯⡻⣬⣝⣻⣹
⣿⣳⠿⣿⣿⣿⣿⣹⢳⣿⣷⡿⣽⡌⣿⡇⣷⡺⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⢂⠈⠀⠀⠀⠀⠀⠀⠠⢀⡀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣌⡜⣿⣿⣿⣿⣷⣏⣶⣭
⣿⣱⢻⡽⣿⣿⣟⢮⣿⣟⣭⡗⣿⡷⣹⡧⣿⡹⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠠⠐⠄⡃⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦⢹⣿⣿⡿⣿⢞⣿⣿
⢯⣱⣿⣘⣛⡻⢭⠾⣋⢗⣸⣏⣟⣿⢻⣧⠷⣩⡛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⡄⡉⢌⡡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣗⡻⣿⣿⢿⡭⣟⣿⣿
⣿⣻⢿⣿⣈⢧⡙⠮⣡⣿⣿⣿⣿⣺⠷⣮⢹⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⢗⡛⢮⣷⣿⣾⢶⡩
⣩⣛⣫⣙⣛⠦⣙⣚⣛⣙⣛⣛⣛⣿⡓⢫⢏⠮⡀⠀⠀⠀⠠⠒⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡄⣎⣙⣶⣻⣟⣿⣶⣥
⡿⣽⣹⣏⡿⢨⡁⢎⡙⣟⣯⣿⡿⣛⣡⠞⣜⠪⡅⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢆⢤⢄⡤⢤⡤⠴⣞⡳⢎⡔⡂⣶⠶⠶⡶⢶⣲
⣟⡼⣱⢎⡷⢡⠚⣤⢑⠩⠾⢫⡕⣣⢇⡻⢌⣣⢱⡀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⠞⣌⠲⢆⡜⣛⠼⡐⢣⠰⡡⢳⠯⡹⢇⡟⢶
⣞⢲⣹⡒⡧⢘⡰⢣⢎⡌⣙⢲⡼⣫⡇⡼⡘⡤⢣⠿⣌⡱⠄⢤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠞⣌⠳⣌⠲⡡⢎⠱⣉⠲⣡⢋⢞⡱⣋⢼⣩
⠌⢣⠒⠱⠃⢆⢡⡓⠮⠑⡤⢫⠷⡳⡇⠵⡱⢌⡱⣏⣳⠃⡜⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠩⣐⠣⣌⢣⡑⢎⡱⣉⠖⠤⢚⠬⡒⣍⢲⢡`
];

function* getRickRoll() {
	for (let i = 0; i < sequence.length; i++) {
		yield sequence[i];
		if (i === sequence.length - 1) i = 0;
	}
}
const rickRoll = getRickRoll();

// display animation in console
setInterval(() => {
	console.clear();
	console.log(rickRoll.next().value);
}, 1000);

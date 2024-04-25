function greetName(name = "anonymos") {
	if (name) {
		console.log(name as string);
	}
	console.log("Hi, " + name.toUpperCase() + "!");
}

greetName(Math.random() > 0.5 ? "Giang" : "anonymos");

export const hello = "world yay";

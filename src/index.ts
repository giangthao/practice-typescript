var hello = true;

function greetName(name: string) {
	console.log("Hi, " + name.toUpperCase() + "!");
}

greetName(Math.random() > 0.5 ? "Giang" : "anonymos");

export const hello = "world yay";

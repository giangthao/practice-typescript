/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// CLASS DECORATOR
declare type ClassDecoratorCustom = <TFunction extends Function>(
	Target: TFunction,
) => TFunction | void; // lib.decorators.legacy.d.ts(19, 14): 'ClassDecorator' was also declared here.

function Banana(target: Function): void {
	target.prototype.banana = function (): void {
		console.log("We are bananas!");
	};
}

@Banana
class FakeBanana {}
const basket: any = new FakeBanana();
basket.banana();

function BananaOther(mes: string) {
	return function (target: Function) {
		target.prototype.getMessage = function (): void {
			console.log(mes);
		};
	};
}

// Extending a class decorator
@BananaOther("I am a RED banana other!")
class FakeBananaOther {}

const basketOther: any = new FakeBananaOther();
basketOther.getMessage(); // Property 'getMessage' does not exist on type 'FakeBananaOther'.

// PROPERTY DECORATOR
function reqired(target: any, key: string) {
	let currentValue = target[key];

	const getter = () => {
		return currentValue;
	};

	const setter = (newValue: string) => {
		if (!newValue) {
			throw Error(`[${key}] must be required`);
		}
		currentValue = newValue;
	};

	if (!target.hasOwnProperty(key)) {
		Object.defineProperty(target, key, {
			set: setter,
			get: getter,
		});
	}
}

function decoratorTest(target: any, key: string) {
	console.log("Decorator test call on ", key);
}

function max(max: number) {
	return function (target: any, key: string) {
		let currentValue = target[key];

		const getter = function () {
			return currentValue;
		};

		const setter = (newValue: string) => {
			if (newValue.length > max) {
				throw Error(`[${key}] must be smaller than ${max}`);
			}

			currentValue = newValue;
		};

		if (!target.hasOwnProperty(key)) {
			Object.defineProperty(target, key, {
				set: setter,
				get: getter,
			});
		}
	};
}

function min(min: number) {
	return function (target: any, key: string) {
		let currentValue = target[key];
		const getter = () => {
			return currentValue;
		};

		const setter = (newValue: string) => {
			if (newValue.length < min) {
				throw Error(`[${key}] must me biggter than ${min}`);
			}

			currentValue = newValue;
		};

		if (!target.hasOwnProperty(key)) {
			Object.defineProperty(target, key, {
				get: getter,
				set: setter,
			});
		}
	};
}

class User {
	@reqired
	@max(20)
	@min(3)
	private username: string;

	@reqired
	@min(6)
	@max(12)
	private password: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
	}

	getUsername(): string {
		return this.username;
	}

	getPassword(): string {
		return this.password;
	}

	setUsername(username: string) {
		this.username = username;
	}

	setPassword(password: string) {
		this.password = password;
	}
}

const u = new User("hoa", "password");
console.log(u);
console.log(u.getPassword());

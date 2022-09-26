class Member {
	constructor(name, address, phone, occupation) {
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.occupation = occupation;
	}
}

class UI {
	addMemberToList(member) {
		const list = document.getElementById("member-list");
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${member.name}</td>
			<td>${member.address}</td>
			<td>${member.phone}</td>
			<td>${member.occupation}</td>
			<td><a href="#" class="delete">x</a></td>
		`;

		list.appendChild(row);
	}

	showAlert(message, className) {
		const div = document.createElement("div");
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.querySelector("#member-form");
		container.insertBefore(div, form);
		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 3000);
	}

	deleteMember(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove();
		}
	}

	clearFields() {
		document.getElementById("name").value = "";
		document.getElementById("address").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("occupation").value = "";
	}
}

// Local Storage Class
class Store {
	static getMembers() {
		let members;
		if (localStorage.getItem("members") === null) {
			members = [];
		} else {
			members = JSON.parse(localStorage.getItem("members"));
		}

		return members;
	}

	static displayMembers() {
		const members = Store.getMembers();
		members.forEach(function (member) {
			const ui = new UI();
			ui.addMemberToList(member);
		});
	}

	static addMember(member) {
		const members = Store.getMembers();
		members.push(member);
		localStorage.setItem("members", JSON.stringify(members));
		console.log(member);
	}

	static removeMember(phone) {
		const members = Store.getMembers();
		members.forEach(function (member, index) {
			if (member.phone === phone) {
				members.splice(index, 1);
			}
		});

		localStorage.setItem("members", JSON.stringify(members));
	}
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayMembers);

// Event Listener for add member
document.getElementById("member-form").addEventListener("submit", function (e) {
	const name = document.getElementById("name").value,
		address = document.getElementById("address").value,
		phone = document.getElementById("phone").value,
		occupation = document.getElementById("occupation").value;

	const member = new Member(name, address, phone, occupation);
	const ui = new UI();

	if (name === "" || address === "" || phone === "" || occupation === "") {
		ui.showAlert("Please fill in the form", "error");
	} else {
		ui.addMemberToList(member);
		Store.addMember(member);
		ui.showAlert("Member added", "success");
		ui.clearFields();
	}

	e.preventDefault();
});

// Event Listener for delete
document.getElementById("member-list").addEventListener("click", function (e) {
	const ui = new UI();
	ui.deleteMember(e.target);
	Store.removeMember(
		e.target.parentElement.previousElementSibling.previousElementSibling
			.textContent
	);
	ui.showAlert("Member removed", "success");
	e.preventDefault();
});

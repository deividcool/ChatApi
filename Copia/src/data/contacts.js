const users = [
	{
		id: 3,
		name: "Deivid Veloza",
		phone_number: "+2348123456789",
		unread: 1,
		messages: {
			"04/06/2021": [
				{
					content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					sender: 3,
					time: "08:11:26",
					status: null,
				},
				{
					content: "hola",
					sender: null,
					time: "08:15:45",
					status: "read",
				},
				{
					content: "hola",
					sender: 3,
					time: "09:11:26",
					status: null,
				},
				{
					content: "hola",
					sender: null,
					time: "09:15:45",
					status: "sent",
				},
			],

			YESTERDAY: [
				{
					content: "hola",
					sender: 3,
					time: "08:11:26",
					status: null,
				},
				{
					content: "hola",
					sender: null,
					time: "08:15:45",
					status: "read",
				},
				{
					content: "hola",
					sender: 3,
					time: "09:11:26",
					status: null,
				},
				{
					content: "hola",
					sender: null,
					time: "09:15:45",
					status: "read",
				},
			],

			TODAY: [
				{
					content: "hola",
					sender: 3,
					time: "08:11:26",
					status: null,
				},
				{
					content: "hola",
					sender: null,
					time: "08:15:45",
					status: "read",
				},
				{
					content: "hola",
					sender: 3,
					time: "09:11:26",
					status: null,
				},
				{
					image: true,
					sender: 3,
					time: "09:12:26",
					status: null,
				},
				{
					image: true,
					sender: null,
					time: "09:13:26",
					status: null,
				},
				{
					content: "BUENAS BUENAS",
					sender: 3,
					time: "09:15:45",
					status: "sent",
				},
			],
		},
		group: false,
		pinned: false,
		typing: false,
	},
	
	];


export default users;

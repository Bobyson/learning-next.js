import { revalidatePath } from "next/cache";

type MockUser = {
    id: number;
    name: string;
}

export default async function MockUsers() {
    const res = await fetch("https://67c2b32f1851890165acffcc.mockapi.io/users");
    const users = await res.json();
 
    async function addUser(formData: FormData) {
        "use server";
        const name = formData.get("name");
        const res = await fetch(
            "https://67c2b32f1851890165acffcc.mockapi.io/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name}),
            }
        );
        const newUser = await res.json();
        revalidatePath("/mock-users")
        console.log(newUser);
    }
    
    async function deleteUser(formData: FormData) {
        "use server";
        const id = formData.get("id");
        const res =  await fetch(
            `https://67c2b32f1851890165acffcc.mockapi.io/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if(res.ok) {
            revalidatePath("/mock-users");
            console.log(`Deleted user with ID: ${id}`);
        } else {
            console.error("Failed to delete user");
        }
    }

    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                <input type="text" name="name" required className="border p-2 mr-2"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
            </form>
            <div className="grid grid-cols-4 gap-4 py-10">
                {users.map((user: MockUser) => (
                    <div key={user.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700 flex items-center justify-between">
                        <span>{user.name}</span>
                        <form action={deleteUser}>
                            <input type="hidden" name="id" value={user.id}/> 
                            <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">🗑️</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}
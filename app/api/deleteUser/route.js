// import { NextResponse } from "next/server";
// import { connectToDatabase } from '../../utils/dbconnect';
// import { ObjectId } from 'mongodb';

// export async function DELETE(req, res) {
//     const { uid } = await req.json();
//     try {
//         const db = await connectToDatabase();
//         await db.collection('users').deleteOne({ _id: new ObjectId(uid) });
//         return NextResponse.json({ success: true });
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to delete user" });
//     }
// }

import { NextResponse } from "next/server";
import { connectToDatabase } from '../../utils/dbconnect';
import { ObjectId } from 'mongodb';

export async function DELETE(req, res) {
    const { uid } = await req.json();
    try {
        const db = await connectToDatabase();

        // Find the user by ID
        const user = await db.collection('users').findOne({ _id: new ObjectId(uid) });

        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        // Delete the associated student profile if the role is Student
        if (user.role === 'Student') {
            await db.collection('studentprofiles').deleteOne({ user: uid });
        }

        // Delete the associated instructor profile if the role is Instructor
        if (user.role === 'Instructor') {
            await db.collection('instructorprofiles').deleteOne({ user: uid });
        }

        // Delete the user
        await db.collection('users').deleteOne({ _id: new ObjectId(uid) });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" });
    }
}

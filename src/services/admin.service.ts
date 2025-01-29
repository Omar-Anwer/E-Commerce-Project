// export const assignRole = async (req: Request, res: Response) => {
//     const { userId, roleId } = req.body;

//     try {
//         const user = await User.findByPk(userId);
//         const role = await Role.findByPk(roleId);

//         if (!user || !role) {
//             return res.status(404).json({ message: 'User or Role not found' });
//         }

//         await user.addRole(role);
//         res.json({ message: 'Role assigned successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
// };

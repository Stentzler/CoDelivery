import {Request, Response} from 'express';

const deleteProductController = async (req: Request, res: Response) => {
	return res.status(204).json();
};

export {deleteProductController};

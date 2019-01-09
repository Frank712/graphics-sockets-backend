import { Router, Request, Response } from 'express';
import Server from "../classes/server";
import {usersConnect} from "../sockets/sockets";
import {GraphData} from "../classes/graph";

export const router = Router();
const graphic = new GraphData();

router.get("/graphic", ( req: Request, res: Response)=>{

    res.json({
        ok: true,
        graphic: graphic.getData()
    });
});

router.post("/graphic", ( req: Request, res: Response)=>{
    const month = req.body.month;
    const value = Number(req.body.value);
    graphic.incrementValue( month, value );

    const server = Server.instance;
    server.io.emit( 'change-data', graphic.getData() );

    res.json({
        ok: true,
        graphic: graphic.getData()
    });
});

router.post("/messages/:id", ( req: Request, res: Response)=>{
    const body = req.body.body;
    const _from = req.body.from;
    const id = req.params.id;
    const payload = {
        _from,
        body
    };

    const server = Server.instance;
    server.io.in( id ).emit( 'message-private', payload );

    res.json({
        ok: true,
        id,
        body,
        _from
    })
});

//  Server to get all the users

router.get('/users', (req:Request, res: Response) => {
    console.log('Hello from /users REST-Server');
    const server = Server.instance;
    server.io.clients( (err: any, clients: string[]) =>{
        if (err){
            return res.json({
                ok: false,
                message: 'An error has occurred!',
                err
            })
        }

        res.json( {
            ok: true,
            clients
        });
    });
});

// get user and names

router.get('/users/detail', (req:Request, res: Response) => {
    res.json({
        ok: true,
        usersConnect: usersConnect.getUserList()
    });
});
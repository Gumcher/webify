import { Request, Response, Router } from 'express';
import { User, IUser, IUserModel } from '../models/User';
import { Repository } from './repository';
import { Checker } from '../helpers/checker';
import { JsonResponse } from '../helpers/response';
import * as bcrypt from 'bcrypt';

export class UserController {
    private repo: Repository<IUserModel>;
    private model: IUserModel;

    constructor(router: Router) {

        this.model = User;
        this.repo = new Repository<IUserModel>(this.model);

        // Binding
        this.register = this.register.bind(this);
        this.connexion = this.connexion.bind(this);

        // Routes
        router.post("/user/register", this.register);
        router.post("/user/connexion", this.connexion);
    }

    async register(req: Request, res: Response) {
        let body = req.body;

        if (Checker.isUserValid(body)) {
            if (body.password != undefined) {
                let hash = bcrypt.hashSync(body.password, 10); // TODO Async
                body.password = hash;
                const user = await this.repo.create(body);
                if (user.err != undefined) {
                    return res.json(user)
                }
                return res.json(user);

            } else {
                const user = await this.repo.create(body);
                return res.json(user);
            }
        }

        return res.json(JsonResponse.error("User not valid", 400));
    }


    connexion(req: Request, res: Response) {
        let body = req.body;
        if (body.email == undefined || body.password == undefined) {
            return res.json(JsonResponse.error("No email or password", 400));
        }


        this.model.findByMail(body.email, (err, user) => {
            if (err) {
                return res.json(JsonResponse.error2(err, 400))
            }

            bcrypt.compare(body.password, user.password, (err2, same) => {
                if (err2 || !same) {
                    return res.json(JsonResponse.error("Incorrect password", 400))
                }

                return res.json(JsonResponse.success(user));
            });
        });

    }
}
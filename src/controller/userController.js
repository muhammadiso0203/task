import User from "../models/usersModel.js";
import { catchError } from "../utils/error-response.js";
import { userValidator } from "../validation/userValidation.js";
import { encode, decode } from "../utils/bcrypt-encrypt.js";
import {
  generateAccesToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { transporter } from "../utils/mailer.js";
import { otpGenerator } from "../utils/otp-generator.js";
import {getCache, setCache} from "../utils/cache.js"

export class userController {
  async createUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { name, email, password } = value;

      const hashedPassword = await decode(password, 7);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });

      return res.status(201).json({
        statusCode: 201,
        message: "succes",
        data: newUser,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async signinUser(req, res) {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      if (!user) {
        catchError(res, 400, "User not found");
      }
      console.log(user);
      
      const isMatchPassword = await encode(password, user.password);
      
      if (!isMatchPassword) {
        catchError(res, 400, "Invalid password");
      }

      const otp = otpGenerator();
      const mailMessage = {
        from: process.env.SMTP_USER,
        to: "muhammadiso0203@gmail.com",
        subject: "qalesan megajin dasturchi",
        text: otp,
      };
      transporter.sendMail(mailMessage, function (err, info) {
        if (err) {
          catchError(res, 400, `Error on sending to mail: ${err}`);
        } else {
          console.log(info);
          setCache(user.email, otp);
        }
      });

      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: accesToken,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async confirmSigninUser(req, res) {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        catchError(res, 404, 'Admin not found')
      }
      const otpCache = getCache(email);
      if (!otpCache || otp != otpCache) {
        catchError(res, 400, 'Otp expired');
      }
      const payload = { id: user._id, role: user.role }
      const accesToken = generateAccesToken(payload);
      const refreshToken = generateRefreshToken(payload);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'succes',
        data: accesToken
      });
    } catch (error) {
      
    }
  }

  async signoutUser(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        catchError(res, 401, "Refresh token not found");
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        catchError(res, 401, "Refresh token expired");
      }
      res.clearCookie("refreshToken");
      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error);
    }
  }

  async accesToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        catchError(res, 401, "Refresh token not found");
      }
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      if (!decodedToken) {
        catchError(res, 401, "Refresh token expired");
      }
      const payload = { id: decodedToken.id, role: decodedToken.role };
      const accesToken = generateAccesToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: accesToken,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllUsers(_, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: users,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      console.log(req.params.id)
      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: user,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateById(req, res) {
    try {
      await User.findById(req.params.id);
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: updateUser,
      });
    } catch (error){
      catchError(res, 500, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const user = await this.findById(req.params.id);
      if (user.role === "admin") {
        catchError(res, 400, `Danggg\nUser admin cannot be delete`);
      }
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        statusCode: 200,
        message: "Succes",
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        catchError(res, 404, `Admin not found by ID ${id}`);
      }
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}

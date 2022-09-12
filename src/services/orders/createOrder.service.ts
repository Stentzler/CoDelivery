import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { Order } from "../../entities/order.entity";
import { AppError } from "../../errors/AppError";
import { Products } from "../../entities/products.entity";
import { Restaurant } from "../../entities/restaurant.entity";


const createOrderService = async (id: string) => {

    let restaurantsList : Restaurant[] = []

    const userRepository = AppDataSource.getRepository(Users)
    const cartRepository = AppDataSource.getRepository(Cart)
    const orderRepository = AppDataSource.getRepository(Order)
    const productRepository = AppDataSource.getRepository(Products)

    
    const user = await userRepository.findOne({where: { id }})
    if(!user){
        throw new AppError("user not found", 404)
    }

    if(!user.isActive){
        throw new AppError("This user was inactivated", 403)
    }

    if(!user?.paymentInfo){
        throw new AppError("You need to register a payment info")
    }



    const cart = await cartRepository.findOne({ where: { id: user?.cart.id}})
    if(!cart){
        throw new AppError( "There is no cart", 400)
    }    

    if(cart.products.length === 0 ){
        throw new AppError(" There is not product on cart", 400)
    }



    cart.products.forEach( async (product) => {
        await productRepository.findOne({where:{ id: product.id}})
        restaurantsList = [...restaurantsList, product.restaurant]
    })

    const newOrder =  new Order()
    newOrder.products = cart.products
    newOrder.total = cart.subtotal
    newOrder.restaurant = restaurantsList
    newOrder.user = user     

    orderRepository.create(newOrder)
    await orderRepository.save(newOrder)

    cart.products = []
    cart.subtotal = 0

    await cartRepository.save(cart)

    const orderReturned = orderRepository.findOne({where: { id: newOrder.id}})

    return orderReturned



}

export {createOrderService}
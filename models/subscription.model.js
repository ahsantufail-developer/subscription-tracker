import mongoose from "Mongoose";

const subscriptionSchema = new mongoose.Schema(definition: {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Subscription is required"],
        minlength: [0, "Price must be greator than 0"],
        maxlength: [10000, "Price must be less than 10000"]
    },
    Currency:
    {
        type: String,
        enum: ["USD", "PKR", "EUR"]
        default: "PKR",
    }
    frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly"]
        default: "Monthly",
    },
    Category: {
        type: String,
        enum: ["Entertainment", "Productivity", "Education", "Finanace", "AI Tools", "Others"]
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
        enum: ["Credit Card", "Jazz Cash", "EasyPaisa", "Bank Transfer", "Others"]
        default: "Debit Card",
    },
    status: {
        type: String:
        enum: ["Active", "Inactive"]
        default: "Active",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= Date.now();
                message: "Start date must be less than or equal to current date",
            }
        }
    },
    nextBillingDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= Date.now();
                message: "Next billing date must be greater than or equal to current date",
            }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }

}, options {
    timestamps: true
});

const Subscription = mongoose.model("SUbscription", SubscriptionSchema);

export default Subscription;
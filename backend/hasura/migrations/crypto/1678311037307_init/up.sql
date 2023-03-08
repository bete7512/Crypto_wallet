SET check_function_bodies = false;
CREATE TABLE public.users (
    id integer NOT NULL,
    "fName" text NOT NULL,
    "lName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    status boolean NOT NULL,
    avator text NOT NULL,
    "roleId" integer NOT NULL
);
CREATE TABLE public.admins (
)
INHERITS (public.users);
CREATE TABLE public."cryptoCurrencyTransaction" (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "recieverId" integer NOT NULL,
    "senderPublicKey" integer NOT NULL,
    "recieverPublicKey" integer NOT NULL,
    "detailUrl" text NOT NULL,
    crypto text NOT NULL,
    amount real NOT NULL,
    status boolean NOT NULL
);
CREATE SEQUENCE public."cryptoCurrencyTransaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."cryptoCurrencyTransaction_id_seq" OWNED BY public."cryptoCurrencyTransaction".id;
CREATE TABLE public.customers (
)
INHERITS (public.users);
CREATE TABLE public.network (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.network_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.network_id_seq OWNED BY public.network.id;
CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL
);
CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
CREATE TABLE public.subscription (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "planId" integer NOT NULL,
    status boolean NOT NULL,
    "leftAmount" real NOT NULL,
    "limit" integer NOT NULL,
    "lastFinished" date NOT NULL
);
CREATE TABLE public."subscriptionFee" (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "subscriptionId" integer NOT NULL,
    amount real NOT NULL,
    "dueDate" date NOT NULL
);
CREATE SEQUENCE public."subscriptionFee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."subscriptionFee_id_seq" OWNED BY public."subscriptionFee".id;
CREATE TABLE public."subscriptionPlan" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price real NOT NULL,
    amount real NOT NULL
);
CREATE SEQUENCE public."subscriptionPlan_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."subscriptionPlan_id_seq" OWNED BY public."subscriptionPlan".id;
CREATE SEQUENCE public.subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.subscription_id_seq OWNED BY public.subscription.id;
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE TABLE public.wallet (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "publicKey" text NOT NULL
);
CREATE SEQUENCE public.wallet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.wallet_id_seq OWNED BY public.wallet.id;
ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public."cryptoCurrencyTransaction" ALTER COLUMN id SET DEFAULT nextval('public."cryptoCurrencyTransaction_id_seq"'::regclass);
ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.network ALTER COLUMN id SET DEFAULT nextval('public.network_id_seq'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
ALTER TABLE ONLY public.subscription ALTER COLUMN id SET DEFAULT nextval('public.subscription_id_seq'::regclass);
ALTER TABLE ONLY public."subscriptionFee" ALTER COLUMN id SET DEFAULT nextval('public."subscriptionFee_id_seq"'::regclass);
ALTER TABLE ONLY public."subscriptionPlan" ALTER COLUMN id SET DEFAULT nextval('public."subscriptionPlan_id_seq"'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.wallet ALTER COLUMN id SET DEFAULT nextval('public.wallet_id_seq'::regclass);
ALTER TABLE ONLY public."cryptoCurrencyTransaction"
    ADD CONSTRAINT "cryptoCurrencyTransaction_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.network
    ADD CONSTRAINT network_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."subscriptionFee"
    ADD CONSTRAINT "subscriptionFee_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."subscriptionPlan"
    ADD CONSTRAINT "subscriptionPlan_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.subscription
    ADD CONSTRAINT subscription_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.wallet
    ADD CONSTRAINT wallet_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

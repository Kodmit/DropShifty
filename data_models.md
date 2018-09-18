
# DropShifty Data Models
  
  
### User
- **id** *int* 
- **username** *varchar 150*
- **firstname** *varchar 150*
- **lastname** *varchar 150*
- **email** *varchar 150*
- **birthday** *date* (nullable)
- **enabled** *boolean*
- **picture_path** *text*
- **password** *text*
- **salt** *text*
- **created_at** *datetime*
- **user_type** *varchar 50*
	- Return : `buyer` or `seller`
- **last_login** *datetime* (nullable)
- **country** *ManyToOne*
	- Return `Country`
- **city** *varchar 200* (nullable)
- **postal_code** *int* (nullable)
- **address_line\_1** *varchar 200* (nullable)
- **address_line\_2** *varchar 200* (nullable)
- **offer** *ManyToOne*
	- Return `Offer`

### Notification
- **id** *int*
- **user** *ManyToOne*
	- Return `User`
- **created_at** *datetime*
- **title** *varchar 60*
- **content** *text*
- **target** *text* (nullable)
- **status** *varchar 10*
	- Return `read` / `unread`
  
### Country
- **id** *int* 
- **name** *varchar 200*
> List of countries to define


### Shop
- **id** *int* 
- **name** *varchar 255*
- **description** *text* (nullable)
- **owner** *ManyToOne*
	- Return `User`
- **category** *ManyToOne*
	- Return `ShopCategory`
- **country** *ManyToOne*
	- Return `Country`
- **city** *varchar 200* (nullable)
- **postal_code** *int* (nullable)
- **address_line\_1** *varchar 200* (nullable)
- **address_line\_2** *varchar 200* (nullable)
- **picture_path** *text*
- **created_at** *datetime*
- **url** *varchar 200*
- **enabled** *bollean*
- **wc_api_url** *string*
- **wc_api_key** *string*
- **wc_user** *string*
- **wc_password** *string*

### Offer
- **id** *int* 
- **name** *varchar 255*
- **description** *string*
- **image** *string*
- **created_at** *datetime*
- **wc_api_limit** *int*
- **wc_orders_limit** *int*
- **enabled** *bollean*
- **price** *bollean*
> Commercial offers

### Reseller
- **id** *int* 
- **name** *varchar 255*
- **website** *string*
- **description** *string*
- **created_at** *datetime*
- **enabled** *bollean*
> Resellers list added by admin

### ResellerUser
- **id** *int* 
- **reseller** *ManyToOne*
	- Return `Reseller`
- **created_at** *datetime*
- **enabled** *bollean*
- **user** *ManyToOne*
	- Return `User`
- **api_key** *string* (nullable)
- **api_secret** *string* (nullable)
- **username** *string* (nullable)
- **password** *string* (nullable)
> Reseller for user with his parameters, it can be only api informations, credentials informations or both.

### Product
- **id** *int* 
- **created_at** *datetime*
- **url** *string*
- **reseller** *ManyToOne*
	- Return `Reseller`
- **shop** *ManyToOne*
	- Return `Shop`
- **price** *int*
- **sku** *varchar 150*
- **last_sync** *datetime*

### Order
- **id** *int* 
- **created_at** *datetime*
- **status** *varchar 200*
- **order_number** *int*
- **reseller** *ManyToOne*
	- Return `Reseller`
- **product** *ManyToOne*
	- Return `Product`
- **status** *varchar 200*
	- Return `validated` / `cancelled` / `pending`
- **reseller** *ManyToOne*
	- Return `Reseller`
- **seller** *ManyToOne*
	- Return `User`
- **price** *float*
- **paiement_method** *varchar 50*

region = "us-east-1"
source_ami = "ami-08c40ec9ead489470" # Ubuntu
ssh_username = "ubuntu"
subnet_id = "subnet-0ca22bf234c1b84b8"


#packer build --var-file=amiFinal.pkrvars.hcl amiFinal.pkr.hcl
#packer build ami.pkr.hcl 
#packer validate amiFinal.pkr.hcl


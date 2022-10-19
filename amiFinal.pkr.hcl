

variable "source_ami" {
  type    = string
  default = "ami-08c40ec9ead489470" # Ubuntu
}


variable "region" {
  type    = string
  default = "us-east-1"
}

variable "ssh_username" {
  type    = string
  default = "ubuntu"
}


variable "access_key" {
  type    = string
  default = env("AWS_ACCESS_KEY_ID")
}


variable "subnet_id" {
  type    = string
  default = "subnet-0ca22bf234c1b84b8"
}

variable "secret_key" {
  type    = string
  default = env("AWS_SECRET_ACCESS_KEY")
}



# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region          = "${var.region}"
  ami_name        = "AMI_{{timestamp}}"
  ami_description = "AMI for CSYE 6225"
  ami_users = ["872062323383"]
  ami_regions = [
    "us-east-1",
  ]
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  
  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/sda1"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]



  provisioner "file" {
    source = "./webapp.zip"
    destination= "~/"
}

  provisioner "shell" {
    script = "./veryfinal.sh"
  }



}





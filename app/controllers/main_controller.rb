class MainController < ApplicationController
  def index
  end

  def sendtext
	text = params[:text];
	name = params[:name];
	menuLink = params[:menuLink]

	# msg = name + ' | ' + text
	msg = text + ' | ' + name + ' | ' + menuLink

	account_sid = "AC9f3390068f6c0a63c3cd46122f801276"
	auth_token = "42e79aec1409fd9a6bfe6eab1857a33a"
	client = Twilio::REST::Client.new account_sid, auth_token

	from = "+19197090054" # Your Twilio number

	friends = {
		"+19196277770" => "David Curtis",
	}

	friends.each do |key, value|
		client.account.messages.create(
			:from => from,
			:to => key,
			:body => msg
		)

		puts "Sent message to #{value}"
	end

	head :ok
  end
end
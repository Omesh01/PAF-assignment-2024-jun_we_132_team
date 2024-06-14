package com.social.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.dto.PostDto;
import com.social.dto.UserDto;
import com.social.dto.mapper.PostDtoMapper;
import com.social.dto.mapper.UserDtoMapper;
import com.social.exception.PostException;
import com.social.exception.UserException;
import com.social.model.Post;
import com.social.model.User;
import com.social.request.PostReplyRequest;
import com.social.request.PostRequest;
import com.social.response.ApiResponse;
import com.social.service.PostService;
import com.social.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/twits")
@Tag(name="Post Management", description = "Endpoints for managing twits")
public class PostController {
	
	private PostService twitService;
	private UserService userService;
	
	public PostController(PostService twitService,UserService userService) {
		this.twitService=twitService;
		this.userService=userService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<PostDto> createTwit(@RequestBody Post req, 
			@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		
		System.out.println("content + "+req.getContent());
		User user=userService.findUserProfileByJwt(jwt);
		Post twit=twitService.createTwit(req, user);
		
		PostDto twitDto=PostDtoMapper.toTwitDto(twit,user);
		
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	
	@PostMapping("/reply")
	public ResponseEntity<PostDto> replyTwit(@RequestBody PostReplyRequest req, 
			@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		
		
		User user=userService.findUserProfileByJwt(jwt);
		Post twit=twitService.createReply(req, user);
		
		PostDto twitDto=PostDtoMapper.toTwitDto(twit,user);
		
		return new ResponseEntity<>(twitDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{twitId}/retwit")
	public ResponseEntity<PostDto> retwit( @PathVariable Long twitId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		Post twit=twitService.retwit(twitId, user);
		
		PostDto twitDto=PostDtoMapper.toTwitDto(twit,user);
		
		return new ResponseEntity<>(twitDto,HttpStatus.OK);
	}
	
	@GetMapping("/{twitId}")
	public ResponseEntity<PostDto> findTwitById( @PathVariable Long twitId, 
			@RequestHeader("Authorization") String jwt) throws PostException, UserException{
		User user=userService.findUserProfileByJwt(jwt);
		Post twit=twitService.findById(twitId);
		
		PostDto twitDto=PostDtoMapper.toTwitDto(twit,user);
		
		return new ResponseEntity<>(twitDto,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{twitId}")
	public ResponseEntity<ApiResponse> deleteTwitById( @PathVariable Long twitId,
		@RequestHeader("Authorization") String jwt) throws UserException, PostException{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		twitService.deleteTwitById(twitId, user.getId());
		
		ApiResponse res=new ApiResponse();
		res.setMessage("twit deleted successfully");
		res.setStatus(true);
		
		return new ResponseEntity<>(res,HttpStatus.OK);
		
	}


	@PutMapping("/{twitId}")
		public ResponseEntity<PostDto> updateTwitById(@RequestBody PostRequest req, @PathVariable Long twitId,
				@RequestHeader("Authorization") String jwt) throws PostException, UserException{
			
			System.out.println("update user  "+req);		
			User user=userService.findUserProfileByJwt(jwt);
			
			Post updatedTwit=twitService.updateTwitByID(twitId, req, user);
			
			PostDto twitDto=PostDtoMapper.toTwitDto(updatedTwit,user);
			
			return new ResponseEntity<>(twitDto,HttpStatus.ACCEPTED);
		}
	
	@GetMapping("/")
	public ResponseEntity<List<PostDto>> findAllTwits(@RequestHeader("Authorization") String jwt) throws UserException{
		User user=userService.findUserProfileByJwt(jwt);
		List<Post> twits=twitService.findAllTwit();
		List<PostDto> twitDtos=PostDtoMapper.toTwitDtos(twits,user);
		return new ResponseEntity<List<PostDto>>(twitDtos,HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<PostDto>> getUsersTwits(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) 
			throws UserException{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.findUserById(userId);
		List<Post> twits=twitService.getUsersTwit(user);
		List<PostDto> twitDtos=PostDtoMapper.toTwitDtos(twits,reqUser);
		return new ResponseEntity<List<PostDto>>(twitDtos,HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}/likes")
	public ResponseEntity<List<PostDto>> findTwitByLikesContainsUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) 
			throws UserException{
		User reqUser=userService.findUserProfileByJwt(jwt);
		User user=userService.findUserById(userId);
		List<Post> twits=twitService.findByLikesContainsUser(user);
		List<PostDto> twitDtos=PostDtoMapper.toTwitDtos(twits,reqUser);
		return new ResponseEntity<List<PostDto>>(twitDtos,HttpStatus.OK);
	}


	@PutMapping("/{mealId}/mealupdate")
	public ResponseEntity<PostDto> updateTwit(@RequestBody Post req, @PathVariable Long mealId,
			@RequestHeader("Authorization") String jwt) 
			throws PostException, UserException{

		System.out.println("update user  "+req);
		User user=userService.findUserProfileByJwt(jwt);
		
		Post updatedTweet=twitService.updateTwitByID(mealId, req, user);
		PostDto twitDto=PostDtoMapper.toTwitDto(updatedTweet,user);
		return new ResponseEntity<>(twitDto,HttpStatus.ACCEPTED);
	}

}
